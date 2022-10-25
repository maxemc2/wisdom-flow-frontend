import React from 'react';
import { Flex, Stack, Button } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export default function ModeFilter() {
	const history = useHistory();
	
	const ModeButton = ({text, color, path}) => (
		<Button w={['44px', '52px', '60px']} h='auto' p='6px'
		border='2px solid' borderColor={color} textAlign='center' 
		fontSize={['12px', '16px', '18px']} color='black'
		onClick={() => history.push(path)}
		>
			{text.substr(0, 2)}<br/>
			{text.substr(2, 2)}
		</Button>
	);

	return (
		<Flex position='fixed' zIndex='999' top='118px' right={['16px', '36px', '36px']}>
			<Stack gap='12px'>
				<ModeButton text='當前人流' color='#FF0000' path='/'/>
				<ModeButton text='預測人流' color='#FF5C00' path='/future'/>
			</Stack>
		</Flex>
	)
}