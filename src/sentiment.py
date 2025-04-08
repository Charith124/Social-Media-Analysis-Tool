import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
import pandas as pd
import numpy as np
import os
import random

# Set black background for plots
plt.style.use("dark_background")
sns.set_theme(style="darkgrid")

# Create output folder
output_dir = "./sentiment_images"
os.makedirs(output_dir, exist_ok=True)

# Fake influencer data
influencers = ["@techsavvy", "@lifestylequeen", "@fitnessfreak", "@gamerguy", "@beautyglow",
               "@travelbug", "@fashiondiva", "@foodielover", "@motivatorX", "@eco_warrior"]

# Sentiment categories
sentiments = ["Positive", "Neutral", "Negative"]
colors = {"Positive": "#00ff99", "Neutral": "#cccccc", "Negative": "#ff4d4d"}

# Generate random sentiment data
def generate_sentiment_data():
    return pd.DataFrame({
        "Influencer": np.random.choice(influencers, 100),
        "Sentiment": np.random.choice(sentiments, 100),
        "Likes": np.random.randint(10, 1000, 100),
        "Comments": np.random.randint(5, 500, 100),
        "Shares": np.random.randint(1, 300, 100),
        "Engagement": lambda df: df["Likes"] + df["Comments"] + df["Shares"]
    })

df = generate_sentiment_data()

# Plot 1: Barplot - Sentiment count
plt.figure(figsize=(10, 6))
sns.countplot(data=df, x="Sentiment", palette=colors)
plt.title("Sentiment Distribution")
plt.savefig(f"{output_dir}/1_sentiment_barplot.png")
plt.close()

# Plot 2: Pie chart - Sentiment
plt.figure(figsize=(6, 6))
df_sentiment = df["Sentiment"].value_counts()
plt.pie(df_sentiment, labels=df_sentiment.index, colors=[colors[s] for s in df_sentiment.index], autopct="%1.1f%%")
plt.title("Sentiment Pie Chart")
plt.savefig(f"{output_dir}/2_sentiment_pie.png")
plt.close()

# Plot 3: Line plot - Likes over influencers
plt.figure(figsize=(10, 5))
likes_data = df.groupby("Influencer")["Likes"].mean().sort_values()
likes_data.plot(kind="line", marker="o", color="cyan")
plt.title("Average Likes per Influencer")
plt.xticks(rotation=45)
plt.savefig(f"{output_dir}/3_likes_lineplot.png")
plt.close()

# Plot 4: Heatmap - Engagement matrix
plt.figure(figsize=(10, 6))
pivot = df.pivot_table(index="Influencer", columns="Sentiment", values="Likes", aggfunc="mean").fillna(0)
sns.heatmap(pivot, annot=True, cmap="YlGnBu")
plt.title("Heatmap of Likes by Sentiment per Influencer")
plt.savefig(f"{output_dir}/4_sentiment_heatmap.png")
plt.close()

# Plot 5: Word Cloud - Positive comments
positive_words = " ".join(["love amazing great happy awesome fantastic wow nice good best excellent " * 5])
wordcloud = WordCloud(width=800, height=400, background_color="black", colormap="cool").generate(positive_words)
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.savefig(f"{output_dir}/5_wordcloud_positive.png")
plt.close()

# Plot 6: Word Cloud - Negative comments
negative_words = " ".join(["hate bad terrible boring worst annoying sad poor awful disappointed " * 5])
wordcloud = WordCloud(width=800, height=400, background_color="black", colormap="Reds").generate(negative_words)
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.savefig(f"{output_dir}/6_wordcloud_negative.png")
plt.close()

# Plot 7: Violin plot - Likes by Sentiment
plt.figure(figsize=(10, 6))
sns.violinplot(data=df, x="Sentiment", y="Likes", palette=colors)
plt.title("Likes Distribution by Sentiment")
plt.savefig(f"{output_dir}/7_violin_likes_sentiment.png")
plt.close()

# Plot 8: Boxplot - Comments by Sentiment
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x="Sentiment", y="Comments", palette=colors)
plt.title("Comments Distribution by Sentiment")
plt.savefig(f"{output_dir}/8_boxplot_comments_sentiment.png")
plt.close()

# Plot 9: Scatter plot - Likes vs Comments
plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x="Likes", y="Comments", hue="Sentiment", palette=colors)
plt.title("Likes vs Comments with Sentiment")
plt.savefig(f"{output_dir}/9_scatter_likes_comments.png")
plt.close()

# Plot 10: KDE plot - Shares
plt.figure(figsize=(10, 6))
for sentiment in sentiments:
    sns.kdeplot(df[df["Sentiment"] == sentiment]["Shares"], label=sentiment, color=colors[sentiment])
plt.title("Shares KDE by Sentiment")
plt.legend()
plt.savefig(f"{output_dir}/10_kde_shares_sentiment.png")
plt.close()

# Plot 11: Histogram - Engagement
df["Engagement"] = df["Likes"] + df["Comments"] + df["Shares"]
plt.figure(figsize=(10, 6))
sns.histplot(df["Engagement"], bins=20, kde=True, color="magenta")
plt.title("Engagement Histogram")
plt.savefig(f"{output_dir}/11_engagement_histogram.png")
plt.close()

# Plot 12: Barplot - Top 5 influencers by likes
top_likes = df.groupby("Influencer")["Likes"].sum().nlargest(5)
plt.figure(figsize=(10, 6))
top_likes.plot(kind="bar", color="lime")
plt.title("Top 5 Influencers by Total Likes")
plt.xticks(rotation=45)
plt.savefig(f"{output_dir}/12_top5_influencers_likes.png")
plt.close()

# Plot 13: Area Plot - Likes & Comments
df_grouped = df.groupby("Influencer")[["Likes", "Comments"]].mean()
df_grouped.sort_values("Likes", inplace=True)
df_grouped.plot(kind="area", stacked=True, figsize=(10, 6), colormap="viridis")
plt.title("Avg Likes & Comments Area Plot")
plt.savefig(f"{output_dir}/13_area_likes_comments.png")
plt.close()

# Plot 14: Strip plot - Sentiment vs Shares
plt.figure(figsize=(10, 6))
sns.stripplot(data=df, x="Sentiment", y="Shares", palette=colors, jitter=True)
plt.title("Shares Strip Plot by Sentiment")
plt.savefig(f"{output_dir}/14_stripplot_shares.png")
plt.close()

# Plot 15: Swarm plot - Sentiment vs Engagement
plt.figure(figsize=(10, 6))
sns.swarmplot(data=df, x="Sentiment", y="Engagement", palette=colors)
plt.title("Engagement Swarm Plot by Sentiment")
plt.savefig(f"{output_dir}/15_swarmplot_engagement.png")
plt.close()

# Plot 16: Line Plot - Likes Trend
trend_df = df.groupby("Influencer")["Likes"].mean()
plt.figure(figsize=(10, 5))
sns.lineplot(data=trend_df, marker="o", color="orange")
plt.title("Trend of Likes per Influencer")
plt.savefig(f"{output_dir}/16_trend_likes.png")
plt.close()

# Plot 17: Countplot - Top influencers
top_df = df[df["Influencer"].isin(top_likes.index)]
plt.figure(figsize=(10, 6))
sns.countplot(data=top_df, x="Influencer", hue="Sentiment", palette=colors)
plt.title("Sentiment Count for Top 5 Influencers")
plt.savefig(f"{output_dir}/17_top5_sentiment_count.png")
plt.close()

# Plot 18: Barplot - Avg Shares per Influencer
avg_shares = df.groupby("Influencer")["Shares"].mean().sort_values()
plt.figure(figsize=(10, 6))
avg_shares.plot(kind="bar", color="skyblue")
plt.title("Avg Shares per Influencer")
plt.xticks(rotation=45)
plt.savefig(f"{output_dir}/18_avg_shares.png")
plt.close()

# Plot 19: Bubble Chart - Comments vs Likes
plt.figure(figsize=(10, 6))
sizes = df["Shares"] * 2
plt.scatter(df["Likes"], df["Comments"], s=sizes, c=df["Shares"], cmap="cool", alpha=0.7)
plt.title("Bubble Chart: Likes vs Comments (Size = Shares)")
plt.colorbar(label="Shares")
plt.savefig(f"{output_dir}/19_bubble_comments_likes.png")
plt.close()

# Plot 20: Word Cloud - Mixed Sentiments
all_words = positive_words + negative_words
wordcloud = WordCloud(width=800, height=400, background_color="black", colormap="spring").generate(all_words)
plt.figure(figsize=(10, 5))
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.title("Mixed Sentiment Word Cloud")
plt.savefig(f"{output_dir}/20_wordcloud_mixed.png")
plt.close()

print("✅ 20 sentiment visualizations have been saved in the 'sentiment_images' folder.")
