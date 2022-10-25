const Button = {
    baseStyle: {
      fontWeight: 'normal',
      color: 'primary.main',
      bg: 'white',
      _hover: {
        color: 'additional.primary.dark.hover',
      },
      _active: {
        color: 'additional.primary.dark.active',
      },
      _disabled: {
        color: 'additional.primary.dark.disabled',
      },
    },
    variants: {
      primarySolid: {
        bg: 'primary.main',
        color: 'white !important',
        _hover: {
          bg: '#336F77',
        },
        _active: {
          bg: 'primary.dark'
        },
        _disabled: {
          bg: 'additional.primary.dark.disabled'
        }
      },
      primaryOutlined: {
        border: '1px solid',
        borderColor: 'primary.main',
        color: '#336F77',
        bg: 'white',
        _hover: {
          bg: 'additional.primary.light.hover',
        },
        _active: {
          bg: 'additional.primary.light.active'
        },
        _disabled: {
          borderColor: 'additional.primary.dark.disabled',
          color: 'additional.primary.dark.disabled'
        }
      },
      secondary: {
        bg: '#DAE0E5',
        color: 'black',
        _hover: {
          bg: '#C4CDD5',
        },
      },
    },
    defaultProps: {
      variant: 'primary',
    },
  };
  
  export default Button;
  