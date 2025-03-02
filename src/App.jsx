import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AlertsPage from "./components/AlertsPage";
import PostPage from "./components/PostPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import CompetitorAnalysis from "./pages/competitoranalysis/CompetitorAnalysis.jsx"; // Default import

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
			</Routes>
		</PageLayout>
	);


}

export default App;