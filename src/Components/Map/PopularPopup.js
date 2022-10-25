import React from "react";
import { Flex, Stack, Box, Text, Button } from '@chakra-ui/react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../../Leaflet_awesome_markers/leaflet.awesome-markers.css';
import '../../Leaflet_awesome_markers/leaflet.awesome-markers.js';

import ColorSelector from "./ColorSelector";

export default function PopularPopup({ location, index = null, update }) {
	let marker = null;
	let iconList = [
		{'icon': 'bag-handle-outline', 'color': 'red'},
		{'icon': 'barbell-outline', 'color': 'darkred'},
		{'icon': 'business-outline', 'color': 'orange'},
		{'icon': 'bus-outline', 'color': 'green'},
		{'icon': 'cart-outline', 'color': 'darkgreen'},
		{'icon': 'image-outline', 'color': 'blue'},
		{'icon': 'paw-outline', 'color': 'cadetblue'},
		{'icon': 'subway-outline', 'color': 'purple'},
		{'icon': 'restaurant-outline', 'color': 'darkpurple'},
	]
	if(index !== null){
		marker = L.AwesomeMarkers.icon({
			icon: iconList[index]['icon'],
			markerColor: iconList[index]['color'],
		});
	}
	else{
		marker = L.AwesomeMarkers.icon({
			markerColor: 'red',
		});
	}

	return (
		<Marker position={[location.latitude, location.longitude]} icon={marker}>
			<Popup>
				<Stack gap='0.5px' fontSize='14px'>
					<Flex justify='space-between'>
						<Text>{location.attraction}</Text>
						<ColorSelector location={location.attraction} update={update} Trigger={
							<Button variant='primarySolid' w='66px' h='22px' fontSize='10px' borderRadius='2px'>變更標誌</Button>
						}/>
					</Flex>
					<Text>地址: {location.address}</Text>
					<Text>電話: {location.phone}<i class="bi bi-1-circle-fill"></i></Text>
					<Flex gap='18px'>
						<Box p='4px 6px' bg='#FF9F10' color='white' borderRadius='4px'>當前人數值: {location.population}</Box>
					</Flex>
				</Stack>
			</Popup>
		</Marker>
	)
}