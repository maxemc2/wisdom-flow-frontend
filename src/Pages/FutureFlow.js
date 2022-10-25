import React, { useState, useEffect } from 'react';
import { Flex, Stack, Box, Text, Divider, Select, Button } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import PopularPopup from '../Components/Map/PopularPopup';
import { getAllAttraction, getFlow, getIcon } from '../Utils/api';
import { townList } from './Data'

export default function CurrentFlow() {
	const today = new Date().toISOString().slice(0,10);
	const [center, setCenter] = useState([22.992677, 120.205153]);
	const [town, setTown] = useState('');
	const [day, setDay] = useState(today);
	const [hour, setHour] = useState(0);
	const [slide, setSlide] = useState(0);
	const [locations, setLocations] = useState([]);
	const [flows, setFlows] = useState([]);
	const [icons, setIcons] = useState([]);

	const getAllDay = () => {
		const getDate = (dateStr) => {  
			let temp = dateStr.split('-');  
			let date = new Date(temp[0],temp[1],temp[2]);  
			return date;  
		}
		const startDate = new Date();  
		const endDate = getDate('2022-09-32');
		let dateList = [];

		while((endDate.getTime()-startDate.getTime())>=0){  
			let year = startDate.getFullYear();  
			let month = (startDate.getMonth()+1).toString().padStart(2, '0');  
			let day = startDate.getDate().toString().padStart(2, '0');  
			dateList.push(year+'-'+month+'-'+day);
			startDate.setDate(startDate.getDate()+1);
		}
		return dateList;		
	};
	const LocationBlock = ({ location }) => (
		<Stack gap='0.5px'>
			<Text>{location.attraction}</Text>
			<Text>地址: {location.address}</Text>
			<Text>電話: {location.phone}</Text>
			<Flex gap='18px'>
				<Box p='4px 6px' bg='#FF9F10' color='white' borderRadius='4px'>
					當前人數值: { flows[location.attraction] !== undefined ? flows[location.attraction][day][hour]['平日'] : ''}
				</Box>
			</Flex>
		</Stack>
	);
	const FilterSelect = () => {
		const map = useMap();
		const handleTown = (e) => {
			setTown(e.target.value);
			setCenter(townList[e.target.value]);
			map.flyTo(townList[e.target.value]);
		}
		return (
			<Flex name='filterSelect'
				position='fixed' zIndex='999' top='20px' left={['10px', '20px', '30px']}
				bg='transparent' borderRadius='4px' gap={['10px', '20px', '30px']}
			>
				<Select placeholder='請選擇區域' bg='white' 
					w={['110px', '130px', '140px']} h={['32px', '40px', '48px']} fontSize={['12px', '16px', '18px']}
					value={town} onChange={handleTown}
				>
					{
						Object.keys(townList).map(name =>
							<option value={name} key={name}>{name}</option>
						)
					}
				</Select>
				<Select placeholder='請選擇日期' bg='white'
					w={['110px', '130px', '140px']} h={['32px', '40px', '48px']} fontSize={['12px', '16px', '18px']}
					value={day} onChange={e => setDay(e.target.value)}
				>
					{
						getAllDay().map((date) => (
							<option value={date} key={date}>{date}</option>
						))
					}
				</Select>
				<Select placeholder='請選擇小時' bg='white'
					w={['110px', '130px', '140px']} h={['32px', '40px', '48px']} fontSize={['12px', '16px', '18px']}
					value={hour} onChange={e => setHour(e.target.value)}
				>
					{
						[...Array(24).keys()].map(hour =>
							<option value={hour} key={hour}>{hour.toString().padStart(2, '0')}</option>
						)
					}
				</Select>
			</Flex>
		)
	};
	const updateIcons = () => {
		let email =  "";
    if(JSON.parse(localStorage.getItem('account')))
      email = JSON.parse(localStorage.getItem('account'));
			
		getIcon('get', email)
		.then(res => setIcons(res));
	}

	useEffect(() => {
		let email =  "";
    if(JSON.parse(localStorage.getItem('account')))
      email = JSON.parse(localStorage.getItem('account'));

		getAllAttraction()
		.then(res => setLocations(res));
		getFlow(today, '2022-10-31')
		.then(res => setFlows(res));
		getIcon('get', email)
		.then(res => setIcons(res))
	}, [])

	return (
		<Flex h='100vh'>
			<Flex name='locationList' alignItems='center'
				position='fixed' zIndex='999' top='118px' left={slide}
				transition='left 0.5s'
			>
				<Stack w='340px' maxH='70vh' overflow='scroll'
					bg='white' p='18px' borderRadius='0 4px 4px 0' 
				>
					<Text>資訊更新時間: {new Date().toTimeString().substring(0, 8)}</Text>
					{
						locations && flows &&
						locations.map((location) =>
							<Stack key={location.attraction}>
								<Divider orientation='horizontal' />
								<LocationBlock location={location} />
							</Stack>
						)
					}
				</Stack>
				<Button  minW='none' p={['8px 4px', '10px 6px', '12px 8px']} borderRadius='0 10px 10px 0'
					onClick={() => setSlide(slide === 0 ? -340 : 0)}
				>
					{
						slide === 0 ?
						<ArrowLeftIcon boxSize={['12px', '13px', '16px']}/> :
						<ArrowRightIcon boxSize={['12px', '13px', '16px']}/>
					}
					
				</Button>
			</Flex>			
			<MapContainer center={center} zoom={16} style={{ width: '100vw', height: '100vh' }}>
				<FilterSelect />
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{
					locations && locations.map((location) => {
						location.population = flows[location.attraction] !== undefined ? flows[location.attraction][day][hour]['平日'] : '';
						let index = icons[location.attraction] !== undefined ? icons[location.attraction] : null;
						return (
							<PopularPopup index={index} location={location} key={location.attraction} update={updateIcons}/>
						)
					})
				}
			</MapContainer>
		</Flex>
	);
}
