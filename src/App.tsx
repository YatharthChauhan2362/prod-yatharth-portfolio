import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { motion, useAnimation } from 'framer-motion';
import styled from '@emotion/styled';
import { FaLinkedin, FaYoutube, FaMedium, FaInstagram, FaTwitter, FaUserCircle, FaSun, FaMoon, FaGithub, FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';

type CustomTheme = {
  background: string;
  color: string;
  accent: string;
  icon: string;
  iconHover: string;
};

const lightTheme: CustomTheme = {
  background: '#fff',
  color: '#000',
  accent: '#888',
  icon: '#000',
  iconHover: '#888',
};

const darkTheme: CustomTheme = {
  background: '#000',
  color: '#fff',
  accent: '#888',
  icon: '#fff',
  iconHover: '#888',
};

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: ${({ theme }) => theme === 'dark' 
    ? 'linear-gradient(45deg, #000000, #1a1a1a)' 
    : 'linear-gradient(45deg, #ffffff, #f0f0f0)'};
`;

const AnimatedCircle = styled(motion.div)<{ theme: CustomTheme }>`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.accent};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.accent};
`;

const AnimatedSquare = styled(motion.div)<{ theme: CustomTheme }>`
  position: absolute;
  background: ${({ theme }) => theme.accent};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.accent};
`;

const AnimatedTriangle = styled(motion.div)<{ theme: CustomTheme }>`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86.6px solid ${({ theme }) => theme.accent};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.accent};
`;

const Container = styled.div<{ theme: CustomTheme }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 2rem;
  text-align: center;
  transition: background 0.3s, color 0.3s;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h1)<{ theme: CustomTheme }>`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${({ theme }) => theme.color}, ${({ theme }) => theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)<{ theme: CustomTheme }>`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.accent};
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialIcon = styled(motion.a)<{ theme: CustomTheme }>`
  color: ${({ theme }) => theme.icon};
  font-size: 1.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.iconHover};
  }
`;

const EmailLink = styled(motion.a)<{ theme: CustomTheme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.icon};
  text-decoration: none;
  margin-top: 2rem;
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.iconHover};
  }
`;

const AnimatedText = styled(motion.div)<{ theme: CustomTheme }>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.accent};
  margin-top: 1rem;
`;

const ThemeToggle = styled.button<{ theme: CustomTheme }>`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.icon};
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 10;
  &:hover {
    color: ${({ theme }) => theme.iconHover};
  }
`;

const ProfileLink = styled(motion.a)<{ theme: CustomTheme }>`
  color: ${({ theme }) => theme.accent};
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  display: inline-block;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.icon};
  }
`;

const AppointmentButton = styled(motion.a)<{ theme: CustomTheme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 2rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.background};
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.icon};
  }
`;

const YouTubeButton = styled(motion.a)<{ theme: CustomTheme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 2rem;
  margin-left: 1rem;
  background: #FF0000;
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 0, 0, 0.3);
    background: #cc0000;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProfileImage = styled(motion.img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
  border: 3px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
`;

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function App() {
  const [theme, setTheme] = useState('dark');
  const controls = useAnimation();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else {
      setTheme(getSystemTheme());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const socialLinks = [
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yatharth-chauhan', label: 'LinkedIn' },
    { icon: <FaYoutube />, url: 'https://www.youtube.com/@yatricloud?sub_confirmation=1&sub_confirmation=1', label: 'YouTube' },
    { icon: <FaWhatsapp />, url: 'https://whatsapp.com/channel/0029VakdAHIFHWq60yHA1Q0s', label: 'WhatsApp' },
    { icon: <FaGithub />, url: 'https://github.com/YatharthChauhan2362', label: 'GitHub' },
    { icon: <FaMedium />, url: 'https://medium.com/@YatharthChauhan', label: 'Medium' },
    { icon: <FaInstagram />, url: 'https://instagram.com/yatharthchauhan_yc', label: 'Instagram' },
    { icon: <FaTwitter />, url: 'https://twitter.com/YatharthStories', label: 'Twitter' },
    { icon: <FaDiscord />, url: 'https://discord.com/invite/92warrKq9j', label: 'Discord' },
    { icon: <SiLinktree />, url: 'https://linktr.ee/yatharthchauhan', label: 'Linktree' },
  ];

  const backgroundElements = [
    { type: 'circle', size: 150, x: '5%', y: '15%' },
    { type: 'square', size: 120, x: '85%', y: '25%' },
    { type: 'triangle', size: 150, x: '15%', y: '75%' },
    { type: 'circle', size: 90, x: '75%', y: '85%' },
    { type: 'square', size: 60, x: '45%', y: '45%' },
    { type: 'triangle', size: 120, x: '95%', y: '55%' },
    { type: 'circle', size: 80, x: '30%', y: '30%' },
    { type: 'square', size: 100, x: '60%', y: '70%' },
  ];

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <BackgroundContainer>
        {backgroundElements.map((element, index) => {
          const Component = element.type === 'circle' 
            ? AnimatedCircle 
            : element.type === 'square' 
              ? AnimatedSquare 
              : AnimatedTriangle;

          return (
            <Component
              key={index}
              theme={theme === 'dark' ? darkTheme : lightTheme}
              style={{
                width: element.type !== 'triangle' ? element.size : undefined,
                height: element.type !== 'triangle' ? element.size : undefined,
                left: element.x,
                top: element.y,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          );
        })}
      </BackgroundContainer>

      <Container theme={theme === 'dark' ? darkTheme : lightTheme}>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme" theme={theme === 'dark' ? darkTheme : lightTheme}>
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
        
        <ProfileImage
          src="https://raw.githubusercontent.com/YatharthChauhan2362/prod-public-images/refs/heads/main/yatharthchauhan.jpg"
          alt="Yatharth Chauhan"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        />

        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        >
          Yatharth Chauhan
        </Title>

        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        >
          Portfolio Coming Soon
        </Subtitle>

        <AnimatedText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        >
          Something amazing is in the works...
        </AnimatedText>

        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <AppointmentButton
            href="https://topmate.io/yatharthchauhan/1161502"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            theme={theme === 'dark' ? darkTheme : lightTheme}
          >
            Book an Appointment
          </AppointmentButton>

          <YouTubeButton
            href="https://www.youtube.com/@yatricloud?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            theme={theme === 'dark' ? darkTheme : lightTheme}
          >
            Subscribe to YouTube
          </YouTubeButton>
        </ButtonContainer>

        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {socialLinks.map((link, index) => (
            <SocialIcon
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.2 }}
              theme={theme === 'dark' ? darkTheme : lightTheme}
            >
              {link.icon}
            </SocialIcon>
          ))}
        </SocialLinks>

        <EmailLink
          href="mailto:contact@yatharthchauhan.me"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        >
          <MdEmail />
          contact@yatharthchauhan.me
        </EmailLink>
      </Container>
    </ThemeProvider>
  );
}

export default App;
