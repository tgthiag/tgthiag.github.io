import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Data for programming languages
const programmingLanguages = [
  {
    name: 'Dart',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Dart_programming_language_logo.svg'
  },
  {
    name: 'JavaScript',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
  },
  {
    name: 'Python',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
  },
  {
    name: 'Java',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg'
  },
  {
    name: 'Kotlin',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png'
  }
];

// Data for frameworks
const frameworks = [
  {
    name: 'Flutter',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png'
  },
  {
    name: 'React',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    name: 'React Native',
    imgUrl: 'https://images-cdn.openxcell.com/wp-content/uploads/2024/07/25082439/reactnative-inner.svg'
  },
  {
    name: 'Express',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png'
  },
  {
    name: 'Node.js',
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
  }
];

const StacksCard = () => {
  // Settings for both carousels
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 4, // Show 3 items by default
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <Card sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#333' }}>
          Stacks
        </Typography>

        {/* Carousel for Programming Languages */}
        <Typography variant="h6" gutterBottom align="center" sx={{ color: '#007acc', marginBottom: 1 }}>
          Programming Languages
        </Typography>
        <Box sx={{ maxWidth: 900, margin: '0 auto', marginBottom: 4, textAlign:"-webkit-center",textAlignLast:"text-align-last" }}>
          <Slider {...settings}>
            {programmingLanguages.map((language, index) => (
              <div key={index} style={{ textAlign: 'center', padding: "3px" }}>
                <img
                  src={language.imgUrl}
                  alt={`Logo of ${language.name}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    marginBottom: '5px',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: '5px',
                    color: '#333',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {language.name}
                </Typography>
              </div>
            ))}
          </Slider>
        </Box>

        {/* Carousel for Frameworks */}
        <Typography variant="h6" gutterBottom align="center" sx={{ color: '#007acc', marginBottom: 1 }}>
          Frameworks
        </Typography>
        <Box sx={{ maxWidth: 900, margin: '0 auto', textAlign:"-webkit-center",textAlignLast:"text-align-last" }}>
          <Slider {...settings}>
            {frameworks.map((framework, index) => (
              <div key={index} style={{ textAlign: 'center', padding: "3px"}}>
                <img
                  src={framework.imgUrl}
                  alt={`Logo of ${framework.name}`}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                    textAlign:"center",
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    marginBottom: '5px',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: '5px',
                    color: '#333',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {framework.name}
                </Typography>
              </div>
            ))}
          </Slider>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StacksCard;
