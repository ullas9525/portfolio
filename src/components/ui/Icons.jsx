// ============================================================
// Icon resolver — maps semantic names (used in data files) to
// react-icons components. Add more as needed.
// ============================================================
import {
  SiCplusplus, SiPython, SiFlutter, SiReact, SiFastapi, SiPostgresql,
  SiFirebase, SiGit, SiGithub, SiDocker, SiGithubactions, SiArduino,
  SiRaspberrypi, SiNumpy, SiPandas, SiLeetcode, SiVite,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import {
  TbUser, TbCode, TbSparkles, TbRoute, TbCpu, TbBook, TbRocket, TbFlame,
  TbChartDots, TbBrain, TbClipboardData, TbWand, TbMessages, TbPrompt,
  TbWifi, TbBluetooth, TbCloud, TbGauge, TbMail, TbDownload,
  TbExternalLink, TbArrowRight, TbMenu, TbX, TbSend, TbDeviceMobile,
  TbFileDownload, TbChevronDown, TbUsers, TbStar, TbCompass, TbLayersLinked,
  TbDatabase, TbPlugConnected, TbBrandGithub, TbPalette, TbApi, TbStack2,
  TbServer, TbHome, TbInfoSquareRounded, TbBook2, TbAward, TbBriefcase,
} from 'react-icons/tb';
import { MdMemory } from 'react-icons/md';

const semantic = {
  user: TbUser,
  code: TbCode,
  spark: TbSparkles,
  route: TbRoute,
  cpu: TbCpu,
  book: TbBook,
  rocket: TbRocket,
  flame: TbFlame,
  chart: TbChartDots,
  brain: TbBrain,
  gauge: TbGauge,
  cloud: TbCloud,
  wifi: TbWifi,
  memory: MdMemory,
  bluetooth: TbBluetooth,
  github: SiGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  mail: TbMail,
  download: TbDownload,
  external: TbExternalLink,
  arrow: TbArrowRight,
  menu: TbMenu,
  close: TbX,
  send: TbSend,
  phone: TbDeviceMobile,
  file: TbFileDownload,
  chevron: TbChevronDown,
  users: TbUsers,
  star: TbStar,
  compass: TbCompass,
  layers: TbLayersLinked,
  database: TbDatabase,
  plug: TbPlugConnected,
  home: TbHome,
  info: TbInfoSquareRounded,
  book2: TbBook2,
  award: TbAward,
  briefcase: TbBriefcase,
  palette: TbPalette,
  api: TbApi,
  stack: TbStack2,
  server: TbServer,
};

const brands = {
  SiCplusplus, SiPython, SiFlutter, SiReact, SiFastapi, SiPostgresql,
  SiFirebase, SiGit, SiGithub, SiDocker, SiGithubactions, SiArduino,
  SiRaspberrypi, SiNumpy, SiPandas, SiLeetcode, SiVite,
};

const tabler = {
  TbUser, TbCode, TbSparkles, TbRoute, TbCpu, TbBook, TbRocket, TbFlame,
  TbChartDots, TbBrain, TbClipboardData, TbWand, TbMessages, TbPrompt,
  TbWifi, TbBluetooth, TbCloud, TbGauge, TbMail, TbDownload,
  TbExternalLink, TbArrowRight, TbMenu, TbX, TbSend, TbDeviceMobile,
  TbFileDownload, TbChevronDown, TbBrandGithub, TbApi,
};

const material = { MdMemory };

export default function Icon({ name, size = 18, ...rest }) {
  const C = semantic[name] || brands[name] || tabler[name] || material[name] || TbCode;
  return <C size={size} {...rest} aria-hidden="true" />;
}

export { SiGithub, FaLinkedin, SiLeetcode, TbMail };