import React from "react";
import { Flex, Button, useToast,
  Popover, PopoverTrigger, PopoverContent, PopoverHeader,
  PopoverBody, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react'
import { BagHandleOutline, BarbellOutline, BusinessOutline, BusOutline,
  CartOutline, ImageOutline, PawOutline, SubwayOutline, RestaurantOutline } from 'react-ionicons'
import { setIcon } from '../../Utils/api'

export default function ColorSelector({ location, Trigger, update }){
  const toast = useToast();
  const IconButton = function({ icon, bgColor, index }){
    return <Button boxSize='40px' bg={bgColor} onClick={() => labelIcon(index)}>{icon}</Button>
  }
  const labelIcon = (index) => {
    let email =  '';
    if(JSON.parse(localStorage.getItem('account')))
      email = JSON.parse(localStorage.getItem('account'));
    
    setIcon('set', email, location, index)
    .then(res => {
      if(res === 'True'){
        toast({
          title: '修改成功!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        update();
      }
      else{
        toast({
          title: '修改失敗!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }).
    catch(() => {
      toast({
        title: '修改失敗!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    })
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
            <IconButton index='0' bgColor='red' icon={<BagHandleOutline color='white'/>}/>
            <IconButton index='1' bgColor='darkred' icon={<BarbellOutline color='white'/>}/>
            <IconButton index='2' bgColor='orange' icon={<BusinessOutline color='white'/>}/>
            <IconButton index='3' bgColor='green' icon={<BusOutline color='white'/>}/>
            <IconButton index='4' bgColor='darkgreen' icon={<CartOutline color='white'/>}/>
            <IconButton index='5' bgColor='blue' icon={<ImageOutline color='white'/>}/>
            <IconButton index='6'bgColor='cadetblue' icon={<PawOutline color='white'/>}/>
            <IconButton index='7' bgColor='purple' icon={<SubwayOutline color='white'/>}/>
            <IconButton index='8' bgColor='#5A386A' icon={<RestaurantOutline color='white'/>}/>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}