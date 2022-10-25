import React, { useState, useEffect } from 'react';
import { Flex, Button, useDisclosure } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function LoginButton() {
	const history = useHistory();
	const [logined, setLogined] = useState(false);
	const { isOpen: isLoginModal, onOpen: openLoginModal, onClose: closeLoginModal } = useDisclosure()
	const logout = () => {
		localStorage.clear();
		history.go(0);
	}

	useEffect(() => {
		let auth = JSON.parse(localStorage.getItem('auth') || 'false');
		if (auth === true)
			setLogined(true);
		else
			setLogined(false);
	}, [isLoginModal])
	
	return (
		<>
			<Flex position='fixed' zIndex='999' top={['60px', '20px', '20px']} right={['16px', '36px', '36px']}>
				{
					logined ?
						<Button variant='primaryOutlined' p={['4px 12px', '6px 14px', '8px 16px']}
							fontSize={['12px', '16px', '18px']} textAlign='center' onClick={logout}
						>
							登出
						</Button> :
						<Button variant='primaryOutlined' h={['32px', '40px', '48px']} p={['0px 12px', '4px 14px', '8px 16px']}
							fontSize={['12px', '16px', '18px']} textAlign='center' onClick={openLoginModal}
						>
							登入
						</Button>
				}
			</Flex>
			<LoginForm isOpen={isLoginModal} onClose={closeLoginModal} />
		</>
	)
}