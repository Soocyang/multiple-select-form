import FormSelection from "./FormSelection/FormSelection.jsx";
import { Container } from "react-bootstrap";
import background from "./images/bg-food.png";

function App() {
	return (
		<div className="App">
			<div
				style={{
					height: "100vh",
					backgroundImage: `url(${background})`,
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}
			>
				<div className="h-100 d-flex align-items-center justify-content-center">
					<Container>
						<FormSelection></FormSelection>
					</Container>
				</div>
			</div>
		</div>
	);
}

export default App;
