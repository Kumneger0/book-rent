import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import SubHeader from './components/belowHeader';
import ProductPage from './components/eachProduct';
import FilterArea from './components/filterArea';
import Footer from './components/footer';
import Header from './components/header';
import Product from './components/product';
export const Home = () => {
	return (
		<>
			<SubHeader />
			<FilterArea />
			<Product />
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
