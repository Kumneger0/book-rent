import './App.css';
import SubHeader from './components/belowHeader';
import FilterArea from './components/filterArea';
import Footer from './components/footer';
import Header from './components/header';
import Product from './components/product';

function App() {
	return (
		<>
			<Header />
			<SubHeader />
			<FilterArea />
			<Product />
			<Footer />
		</>
	);
}

export default App;
