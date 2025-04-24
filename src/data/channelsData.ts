
export interface Channel {
  id: string;
  name: string;
  subtitle?: string;
  logoUrl: string;
  streamUrl: string;
  description?: string;
  category: "hindi" | "english" | "business";
}

export const channels: Channel[] = [
  {
    id: "aaj-tak",
    name: "Aaj Tak",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Aaj_tak_logo.png",
    streamUrl: "https://www.youtube.com/embed/Nq2wYlWFucg",
    category: "hindi",
    description: "Live coverage of breaking news from across India"
  },
  {
    id: "abp-news",
    name: "ABP News",
    subtitle: "India",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/ABP_News_logo.svg/1200px-ABP_News_logo.svg.png",
    streamUrl: "https://www.youtube.com/embed/_HZCms2FmH8",
    category: "hindi"
  },
  {
    id: "india-tv",
    name: "India TV",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/India_TV_Logo.svg/1200px-India_TV_Logo.svg.png",
    streamUrl: "https://www.youtube.com/embed/Xmm3Kr5P1Hc",
    category: "hindi"
  },
  {
    id: "republic-bharat",
    name: "Republic",
    subtitle: "Bharat",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Republic_Bharat_logo.svg/1200px-Republic_Bharat_logo.svg.png",
    streamUrl: "https://www.youtube.com/embed/JLDAeXhDjHU",
    category: "hindi"
  },
  {
    id: "ndtv-india",
    name: "NDTV India",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/NDTV_India.svg/1200px-NDTV_India.svg.png",
    streamUrl: "https://www.youtube.com/embed/MN8p-Vrxiyk",
    category: "hindi"
  },
  {
    id: "times-now-navbharat",
    name: "Times Now",
    subtitle: "Navbharat",
    logoUrl: "https://static.timesofindiacdn.com/photo/85982715.cms",
    streamUrl: "https://www.youtube.com/embed/pysYczdtgew",
    category: "hindi"
  },
  {
    id: "news24",
    name: "News 24",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/News24_Logo.jpg",
    streamUrl: "https://www.youtube.com/embed/WH7Cs0-UvZo",
    category: "hindi"
  },
  {
    id: "cnbc-awaaz",
    name: "CNBC",
    subtitle: "Awaaz",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/CNBC_Awaaz_logo.svg/1200px-CNBC_Awaaz_logo.svg.png",
    streamUrl: "https://www.youtube.com/embed/sGr_gO7_lNY",
    category: "business"
  },
  {
    id: "republic-tv",
    name: "Republic",
    subtitle: "TV",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Republic_TV.svg/1200px-Republic_TV.svg.png",
    streamUrl: "https://www.youtube.com/embed/NLUQPN4POQ8",
    category: "english"
  },
  {
    id: "dd-news",
    name: "DD News",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/DD_News.png/280px-DD_News.png",
    streamUrl: "https://www.youtube.com/embed/Cy_6-_XUW-c",
    category: "hindi"
  },
  {
    id: "india-news",
    name: "India News",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/India_news.svg/1200px-India_news.svg.png",
    streamUrl: "https://www.youtube.com/embed/yN4yNJlpIQ8",
    category: "hindi"
  },
  {
    id: "ndtv-profit",
    name: "NDTV Profit",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/NDTV_Profit.svg/1200px-NDTV_Profit.svg.png",
    streamUrl: "https://www.youtube.com/embed/oczVdZZW3M0",
    category: "business"
  }
];
