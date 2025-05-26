import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaYoutube, FaMedium, FaInstagram, FaTwitter, FaGithub, FaWhatsapp, FaDiscord, FaSun, FaMoon } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import { MdEmail } from 'react-icons/md';
import { Helmet } from 'react-helmet';

interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

const lightTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#007bff',
  secondary: '#6c757d'
};

const darkTheme: Theme = {
  background: '#121212',
  text: '#ffffff',
  primary: '#0d6efd',
  secondary: '#6c757d'
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
  margin: 0;
  padding: 0;
`;

const AnimatedCircle = styled(motion.div)<{ theme: Theme }>`
  position: absolute;
  border-radius: 50%;
  background: ${({ theme }) => theme.secondary};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.secondary};
`;

const AnimatedSquare = styled(motion.div)<{ theme: Theme }>`
  position: absolute;
  background: ${({ theme }) => theme.secondary};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.secondary};
`;

const AnimatedTriangle = styled(motion.div)<{ theme: Theme }>`
  position: absolute;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86.6px solid ${({ theme }) => theme.secondary};
  opacity: 0.2;
  filter: blur(2px);
  box-shadow: 0 0 20px ${({ theme }) => theme.secondary};
`;

const Container = styled.div<{ theme: Theme }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  text-align: center;
  transition: background 0.3s, color 0.3s;
  position: relative;
  z-index: 2;
  margin: 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
    min-height: 100vh;
  }
`;

const Title = styled(motion.h1)<{ theme: Theme }>`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  background: linear-gradient(45deg, ${({ theme }) => theme.text}, ${({ theme }) => theme.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled(motion.p)<{ theme: Theme }>`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
    margin-top: 1rem;
    padding: 0 0.5rem;
  }
`;

const SocialIcon = styled(motion.a)<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const EmailLink = styled(motion.a)<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin-top: 2rem;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const AnimatedText = styled(motion.div)<{ theme: Theme }>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.secondary};
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

const ThemeToggle = styled.button<{ theme: Theme }>`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 10;
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.00 rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin: 0.75rem 0;
  }
`;

const AppointmentButton = styled(motion.a)<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 0;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.background};
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.text};
  }
`;

const YouTubeButton = styled(motion.a)<{ theme: Theme }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin-top: 0;
  margin-left: 1rem;
  background: #FF0000;
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    margin-left: 0;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 0, 0, 0.3);
    background: #cc0000;
  }
`;

const ProfileImage = styled(motion.img)<{ theme: Theme }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 2rem;
  border: 3px solid ${props => props.theme.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

function getSystemTheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as 'light' | 'dark') || 'dark';
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored as 'light' | 'dark');
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
      <Helmet>
        <title>Yatharth Chauhan - Let's Connect & Build Together</title>
        <meta name="description" content="Connect with Yatharth Chauhan - Technology Innovator, Content Creator & Community Builder. Let's collaborate, learn, and grow together in the world of technology." />
        <meta name="keywords" content="Yatharth Chauhan, Technology, Innovation, Connect, Collaborate, Community, Growth, Tech Content, YouTube, LinkedIn" />
        <meta property="og:title" content="Yatharth Chauhan - Let's Connect & Build Together" />
        <meta property="og:description" content="Connect with Yatharth Chauhan - Technology Innovator, Content Creator & Community Builder. Let's collaborate, learn, and grow together in the world of technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yatharthchauhan.me" />
        <meta property="og:image" content="https://raw.githubusercontent.com/YatharthChauhan2362/prod-public-images/refs/heads/main/yatharthchauhan.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yatharth Chauhan - Let's Connect & Build Together" />
        <meta name="twitter:description" content="Connect with Yatharth Chauhan - Technology Innovator, Content Creator & Community Builder. Let's collaborate, learn, and grow together in the world of technology." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/YatharthChauhan2362/prod-public-images/refs/heads/main/yatharthchauhan.jpg" />
        <link rel="canonical" href="https://yatharthchauhan.me" />
      </Helmet>
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
          Let's Connect & Build Together
        </Subtitle>

        <AnimatedText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          theme={theme === 'dark' ? darkTheme : lightTheme}
        >
          {getGreeting()} 👋
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
Schedule a Meeting
          </AppointmentButton>

          <YouTubeButton
            href="https://www.youtube.com/@yatricloud?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            theme={theme === 'dark' ? darkTheme : lightTheme}
          >
            Join Our Community
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
