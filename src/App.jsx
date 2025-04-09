import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import AlertsPage from "./components/AlertsPage.jsx";
import PostPage from "./components/PostPage.jsx";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase.js";
import CompetitorAnalysis from "./pages/competitoranalysis/CompetitorAnalysis.jsx"; // Default import
import SentimentAnalysis from "./pages/sentimentanalysis/SentimentAnalysis.jsx";
import MultiBrandManagement from "./pages/multibrandmanagement/MultiBrandManagement.jsx";


function App() {
  const [authUser] = useAuthState(auth);


	return (
		<PageLayout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				<Route path='/:username' element={<ProfilePage />} />
				<Route path='/alerts' element={<AlertsPage />} />
				<Route path='/post/:postId' element={<PostPage />} /> {/* Added this route */}
        		<Route path="/competitoranalysis" element={<CompetitorAnalysis />} />
				<Route path="/sentimentanalysis" element={<SentimentAnalysis />} /> {/* Added this route */}
				<Route path="/multibrandmanagement" element={<MultiBrandManagement />} />
			</Routes>
		</PageLayout>
	);


}

export default App;