import React from 'react';
import styles from "./CodeSnippet.module.css";

import {AngleContext} from '../AngleProvider';

function CodeSnippet({colors}) {
	const {angle} = React.useContext(AngleContext);

	return (
		<div className={styles.codeSnippet}>
			<div className={styles.textarea}>
				<div className={styles.tokenLine}>
					<span style={{color: "var(--syntax-prop)"}}>background-image</span>
					<span className={styles.symbol}>:</span>
					<span className={styles.function} style={{marginLeft: "15px"}}>linear-gradient</span>
					<span>{"("}</span>
				</div>
				<div className={styles.tokenLine}>
					<div className={styles.value}>
						<span>{angle}</span>
						<span>deg</span>
						<span className={styles.symbol}>,</span>
					</div>
				</div>
				{colors.map((color, idx) => {
					const hsl = hexToHSL(color);
					const id = crypto.randomUUID();

					return(
					<div key={id} className={styles.tokenLine}>
						<span className={styles.function}>hsl</span>
						<span>{"("}</span>
						{hsl.map((t, index) => (
							<div key={index} className={styles.value}>
								<span>{t}</span>
								<span>{index == 0 ? "deg":"%"}</span>
							</div>
						))}
						<span style={{marginLeft: "-10px"}}>{")"}</span>
						{ idx !== colors.length - 1 && <span className={styles.symbol}>,</span> }
					</div>)
				})}
				<div className={styles.tokenLine}>
					<span>{")"}</span>
					<span className={styles.symbol}>;</span>
				</div>
			</div>
		</div>
	);
}


function hexToHSL(h){
	const rgb = hexToRGB(h);
	return RGBToHSL(...rgb);
}

function hexToRGB(h) {
	let r = 0, g = 0, b = 0, a = 1;
  
	if (h.length == 7) {
	  r = "0x" + h[1] + h[2];
	  g = "0x" + h[3] + h[4];
	  b = "0x" + h[5] + h[6];
	
	} else if (h.length == 9) {
	  r = "0x" + h[1] + h[2];
	  g = "0x" + h[3] + h[4];
	  b = "0x" + h[5] + h[6];
	  a = "0x" + h[7] + h[8];
	}
	a = +(a / 255).toFixed(3);
  
	return [r, g, b];
}

function RGBToHSL(r,g,b) {
	// Make r, g, and b fractions of 1
	r /= 255;
	g /= 255;
	b /= 255;
   
	// Find greatest and smallest channel values
	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;
		
	// Calculate hue
	// No difference
	if (delta == 0) h = 0;
	// Red is max
	else if (cmax == r) h = ((g - b) / delta) % 6;
	// Green is max
	else if (cmax == g) h = (b - r) / delta + 2;
	// Blue is max
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);
  
	// Make negative hues positive behind 360°
	if (h < 0) h += 360;
	
	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	
	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	// return a < 1 ? [h,s,l,a] : [h,s,l];
	return [h,s,l];
}

export default CodeSnippet;
