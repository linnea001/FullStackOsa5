let token = null

const blogs = [
  {
    title: "Daily Cup of Yoga",
    author: "Brian",
    url: "http://dailycupofyoga.com/",
    likes: 30,
    id: "5bc7abb29753ac1e70a9c0ef",
    user: null
  },
  {
    title: "Yay for Today",
    author: "Yogi",
    url: "https://www.yayfortoday.net/",
    likes: 35,
    id: "5bdcc95c362dea1c64858612",
    user: {
      _id: "5bd37cf2325ae81d509eaec6",
      username: "tallustelija",
      name: "Tellu"
    }
  },
  {
    title: "EkhartYoga",
    author: "Esther Ekhart",
    url: "https://www.ekhartyoga.com",
    likes: 38,
    id: "5bd4e086bd97c6138ccc036d",
    user: {
      _id: "5bd37cf2325ae81d509eaec6",
      username: "tallustelija",
      name: "Tellu"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }