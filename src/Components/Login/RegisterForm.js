import React, { useState } from 'react';
import {
	Button, useToast, Modal, ModalCloseButton,
	ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
	FormControl, FormLabel, FormErrorMessage, FormHelperText,
	Input, InputGroup, InputRightElement
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';

export default function RegisterForm({ isOpen, onClose }) {
	const toast = useToast();
	const [visiblePassword, setVisiblePassword] = useState(false);
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
			toast({
				title: '註冊失敗!',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
		else {
			toast({
				title: '註冊成功!',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
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

	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>註冊</ModalHeader>
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
					</ModalBody>

					<ModalFooter>
						<Button variant="solid" onClick={onClose}>
							取消
						</Button>
						<Button variant='primarySolid' ml={3} type="submit"
							isDisabled={!formik.values.account || !formik.values.password}
						>
							註冊
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}