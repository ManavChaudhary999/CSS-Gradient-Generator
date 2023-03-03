import React from 'react';
import {Code} from "react-feather";

import {AngleContext} from '../AngleProvider';

import AngleSlider from '../AngleSlider';
import CodeSnippet from '../CodeSnippet/CodeSnippet';

function App() {
	const [colors, setColors] = React.useState(['#FFD500', '#FF0040']);
	const copyButtonTextRef = React.useRef();

	const {angle} = React.useContext(AngleContext);

	const colorStops = colors.join(', ');
	const backgroundImage = `linear-gradient(${angle}deg, ${colorStops})`;


	function addColor(){
		if(colors.length >= 5) {
			alert("Maximum Limit Reached To Add Colors");
			return;
		}
		const newColor = "#FF0040";
		const nextColors = [...colors];
		nextColors.push(newColor);
		setColors(nextColors);
	}
	
	function removeColor(colorId) {
		if(colors.length <= 1) {
			alert("Minimum Limit Reached To Remove Colors");
			return;
		}
		const nextColors = colors.filter((c, idx)=> idx !== colorId);

		setColors(nextColors);
	}

	function handleCopy() {

		const cssCode = `background-image: linear-gradient(
			${angle}deg,
			${colorStops}
		);`;
		navigator.clipboard.writeText(cssCode);
		copyButtonTextRef.current.textContent = 'Copied!';
		window.setTimeout(()=> {
			copyButtonTextRef.current.textContent = 'Copy CSS';
		}, 3000);
	}

	return (
		<div className="wrapper">
			<div className="gradient-preview" style={{ backgroundImage }} />

			<div className="controls">
				<div className="control">
					<span>Colors:</span>
					<div className="colors">
						{colors.map((color, index) => {
							const colorId = `color-${index}`;
							return (
								<div key={colorId} className="color-wrapper">
									<input
										id={colorId} type="color"
										value={color}
										onChange={(e)=> {
											const newColors = [...colors]
											newColors[index] = e.target.value;
											
											setColors(newColors);
										}}
									/>
									{colors?.length > 1 && <button className='remove-btn' 
									onClick={()=> removeColor(index)}>
										X
									</button>}
								</div>
							);
						})}
						{colors?.length < 5 && <button className='add-btn' onClick={addColor}>+</button>}
					</div>
				</div>

				<div className='control'>
					<div className='title'>
						<span>Angle:</span>
						<span>{`${angle}deg`}</span>
					</div>
					<AngleSlider />
				</div>

				<div className='control'>
					<div className='title'>
						<span>Your Gradient:</span>
						<span>CSS</span>
					</div>
					<CodeSnippet colors={colors} />
					<button className='btn-copy' onClick={handleCopy}>
						<Code size={20} />
						<span ref={copyButtonTextRef}>Copy CSS</span>
					</button>
				</div>



				{/* TO DO  */}
				{/* <div className='control'>
					<div className='title'>
						<span>Color Mode:</span>
					</div>
				</div> */}
				{/* <div className='control'>
					<div className='title'>
						<span>Precision:</span>
						<span>0</span>
					</div>
				</div> */}
				{/* <div className='control'>
					<div className='title'>
						<span>Easing Curve:</span>
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default App;
