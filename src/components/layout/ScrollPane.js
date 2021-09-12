import React, { createContext, useState } from 'react';
import styled from 'styled-components';

import { breakpoints } from 'web/styles/breakpoints';

export const ScrollContext = createContext({ scrollElement: null });

const ScrollPaneElement = styled.main`
	overflow: auto;
	-webkit-overflow-scrolling: touch;

	${breakpoints.large`
    overflow-y: scroll;
  `};
`;

export default function ScrollPane({ children, ...props }) {
	let [ref, setRef] = useState(null);

	return (
		<ScrollPaneElement ref={setRef} {...props}>
			<ScrollContext.Provider
				value={{
					scrollElement: ref,
				}}
			>
				{children}
			</ScrollContext.Provider>
		</ScrollPaneElement>
	);
}
