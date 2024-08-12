import './App.css';
import SubHeader from './components/belowHeader';
import FilterArea from './components/filterArea';
import Subscription from './components/subscription';
import Header from './components/header';
import Product from './components/product';
import Footer from './components/footer';
import { Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductPage from './components/eachProduct';
export const Home = () => {
	return (
		<>
			<SubHeader />
			<FilterArea />
			<Product />
			<Subscription />
		</>
	);
};

const Page2 = () => {
	return (
		<>
			<ProductPage />
		</>
	);
};

const router = createBrowserRouter([
	{
		path: '/',
		Component: Home
	},
	{
		path: '/page2',
		Component: Page2
	}
]);

function App() {
	return (
		<>
			<Header />
			<RouterProvider router={router} />
			<Footer />
		</>
	);
}

export default App;
