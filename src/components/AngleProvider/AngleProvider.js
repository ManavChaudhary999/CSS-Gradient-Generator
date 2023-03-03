import React from 'react';

export const AngleContext = React.createContext();

function AngleProvider({children}) {
	const [angle, setAngle] = React.useState(45);

	const value = {angle, setAngle};

	return (<AngleContext.Provider value={value} >
		{children}
	</AngleContext.Provider>)
}

export default AngleProvider;
