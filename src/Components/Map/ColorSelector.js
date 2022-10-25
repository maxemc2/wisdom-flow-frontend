import React from "react";
import { Flex, Stack, Box, Text, Button,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor } from '@chakra-ui/react'
import { BagHandleOutline, BarbellOutline, BusinessOutline, BusOutline,
  CartOutline, ImageOutline, PawOutline, SubwayOutline, RestaurantOutline } from 'react-ionicons'

export default function ColorSelector({ Trigger }){
  const IconButton = function({ icon, bgColor }){
    return <Button boxSize='40px' bg={bgColor}>{icon}</Button>
  }

  return (
    <Popover>
      <PopoverTrigger>
        {Trigger}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>請選擇喜好的標誌</PopoverHeader>
        <PopoverBody height='auto'>
          <Flex width='100%' flexWrap='wrap' justifyContent='flex-start' gap='10px'>
            <IconButton bgColor='red' icon={<BagHandleOutline color='white'/>}/>
            <IconButton bgColor='darkred' icon={<BarbellOutline color='white'/>}/>
            <IconButton bgColor='orange' icon={<BusinessOutline color='white'/>}/>
            <IconButton bgColor='green' icon={<BusOutline color='white'/>}/>
            <IconButton bgColor='darkgreen' icon={<CartOutline color='white'/>}/>
            <IconButton bgColor='blue' icon={<ImageOutline color='white'/>}/>
            <IconButton bgColor='cadetblue' icon={<PawOutline color='white'/>}/>
            <IconButton bgColor='purple' icon={<SubwayOutline color='white'/>}/>
            <IconButton bgColor='#5A386A' icon={<RestaurantOutline color='white'/>}/>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}