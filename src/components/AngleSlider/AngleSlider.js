import React from 'react';
import styles from "./AngleSlider.module.css";

import { AngleContext } from '../AngleProvider';

function calcAngleDegrees(x, y) {
	return Math.atan2(y, x) * 180 / Math.PI;
  }

function AngleSlider() {
	const [isDown, setIsDown] = React.useState(false);
	const {angle, setAngle} = React.useContext(AngleContext);

	const sliderContainerRef = React.useRef(); // To Check mouse point event listener
	const angleSliderRef = React.useRef(); // To get XY position for the first time

	function CalculateAngle(e){
		const sliderStartPos = angleSliderRef.current.getBoundingClientRect();
		const diffX = (e.clientX - sliderStartPos.x);
		const diffY = (e.clientY - sliderStartPos.y);
		var calcAngle = Math.floor(calcAngleDegrees(diffX, diffY));
		
		if(calcAngle < 0)
		{
			calcAngle = 180 + (180 - Math.abs(calcAngle));
		}
		return calcAngle;
	}

	React.useEffect(()=> {
		
		function MouseDown(e) {
			if(e.target !== sliderContainerRef.current) return;
			
			const calcAngle = CalculateAngle(e);
			setAngle(calcAngle);
			setIsDown(true);
		}
		function MouseUp(e) {			
			setIsDown(false);
		}

		window.addEventListener('mousedown', MouseDown);
		window.addEventListener('mouseup', MouseUp);
		
		return ()=> {
			window.removeEventListener('mousedown', MouseDown);
			window.addEventListener('mouseup', MouseUp);
		}
	}, []);

	React.useEffect(()=> {
		if(!isDown) return;
		
		function MouseMove(e) {
			const calcAngle = CalculateAngle(e);
			setAngle(calcAngle);
		}

		window.addEventListener('mousemove', MouseMove);
		
		return ()=> {
			window.removeEventListener('mousemove', MouseMove);
		}

	},[isDown])

	return (
		<div ref={sliderContainerRef} className={styles.angleSlider}>
			<div className={styles.lineX} />
			<div className={styles.lineY} />
			<div className={styles.lineSlider} style={{transform: `rotate(${angle}deg)`}} />
			<div ref={angleSliderRef} className={styles.circle} />
		</div>
	)
}

export default React.memo(AngleSlider);
