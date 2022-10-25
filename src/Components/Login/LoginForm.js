import React, { useState, useEffect } from 'react';
import {
	Button, Text, Link, useToast, useDisclosure, Modal, ModalCloseButton,
	ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
	FormControl, FormLabel, FormErrorMessage, FormHelperText,
	Input, InputGroup, InputRightElement
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import RegisterForm from './RegisterForm';

export default function LoginForm({ isOpen, onClose }) {
	const toast = useToast();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const { isOpen: isRegisterModal, onOpen: openRegisterModal, onClose: closeRegisterModal } = useDisclosure();
	const validate = (values) => {
		const passwdReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		const errors = {};
		if (!passwdReg.test(values.password)) {
			errors.password = '密碼格式錯誤';
		}
		return errors;
	};
	const onSubmit = (values) => {
		if (!(values.account === 'test' && values.password === 'Test@1234')) {
			formik.setFieldError('account', '帳號或密碼錯誤');
			formik.setFieldError('password', '帳號或密碼錯誤');
			toast({
				title: '登入失敗!',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
		else {
			toast({
				title: '登入成功!',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			localStorage.clear();
			localStorage.setItem('auth', JSON.stringify(true));
			onClose();
		}
	};
	const formik = useFormik({
		initialValues: {
			account: '',
			password: '',
		},
		validate,
		onSubmit,
	});
	useEffect(() => {
		formik.resetForm();
	}, [isOpen]);

	return (
		<>
			<Modal onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>登入</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={formik.handleSubmit}>
						<ModalBody>
							<FormControl isInvalid={formik.errors.account}>
								<FormLabel>帳號</FormLabel>
								<InputGroup>
									<Input type='text' name='account'
										onChange={formik.handleChange} value={formik.values.account}
									/>
								</InputGroup>
								<FormErrorMessage>{formik.errors.account}</FormErrorMessage>
							</FormControl>
							<FormControl mt='10px' isInvalid={formik.errors.password}>
								<FormLabel>密碼</FormLabel>
								<InputGroup>
									<Input type={visiblePassword ? 'text' : 'password'} name='password'
										onChange={formik.handleChange} value={formik.values.password}
									/>
									{formik.values.password && (
										<InputRightElement color="primary.main" cursor={'pointer'}
											onClick={() => setVisiblePassword(!visiblePassword)}
											children={visiblePassword ? <ViewOffIcon /> : <ViewIcon />}
										/>
									)}
								</InputGroup>
								<FormHelperText>
									請混合使用 8 個字元以上的大小寫英文字母、數字和符號
								</FormHelperText>
								<FormErrorMessage>{formik.errors.password}</FormErrorMessage>
							</FormControl>
							<Text mt='4px' fontSize='14px'>
								尚未註冊?&nbsp;
								<Link color='primary.main'
									onClick={() => {
										onClose();
										openRegisterModal();
									}}
								>
									註冊
								</Link>
							</Text>
						</ModalBody>
						<ModalFooter>
							<Button variant="solid" onClick={onClose}>取消</Button>
							<Button variant='primarySolid' ml={3} type="submit"
								isDisabled={!formik.values.account || !formik.values.password}
							>
								登入
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
			<RegisterForm isOpen={isRegisterModal} onClose={closeRegisterModal} />
		</>
	)
}