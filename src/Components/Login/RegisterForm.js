import React, { useState } from 'react';
import {
	Button, Stack, useToast, Modal, ModalCloseButton,
	ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
	FormControl, FormLabel, FormErrorMessage, FormHelperText,
	Input, InputGroup, InputRightElement, Select
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { register } from '../../Utils/api'

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
		register( values.account, values.password, values.name, values.gender, values.age )
		.then(res => {
			if (res === 'True') {
				toast({
					title: '註冊成功!',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				onClose();
			}
			else {
				toast({
					title: '註冊失敗!',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		})
		.catch(() => 
			toast({
				title: '註冊失敗!',
				status: 'error',
				duration: 5000,
				isClosable: true,
			})
		)
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			account: '',
			password: '',
			gender: '',
			age: ''
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
						<Stack spacing='10px'>
							<FormControl isInvalid={formik.errors.name}>
								<FormLabel>使用者名稱</FormLabel>
								<InputGroup>
									<Input type='text' name='name'
										onChange={formik.handleChange} value={formik.values.name}
									/>
								</InputGroup>
								<FormErrorMessage>{formik.errors.name}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.account}>
								<FormLabel>電子信箱（帳號）</FormLabel>
								<InputGroup>
									<Input type='text' name='account'
										onChange={formik.handleChange} value={formik.values.account}
									/>
								</InputGroup>
								<FormErrorMessage>{formik.errors.account}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.password}>
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
							<FormControl isInvalid={formik.errors.account}>
								<FormLabel>性別</FormLabel>
								<InputGroup>
									<Select name='gender'
										onChange={formik.handleChange} value={formik.values.gender}
									>
										<option value='男'>男</option>
										<option value='女'>女</option>
									</Select>
								</InputGroup>
								<FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={formik.errors.age}>
								<FormLabel>年齡</FormLabel>
								<InputGroup>
									<Input type='text' name='age'
										onChange={formik.handleChange} value={formik.values.age}
									/>
								</InputGroup>
								<FormErrorMessage>{formik.errors.age}</FormErrorMessage>
							</FormControl>
						</Stack>
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