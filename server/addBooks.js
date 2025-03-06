import "dotenv/config.js"
import mongoose from "mongoose"
import BookSchema from "./models/bookModel.js"

const MONGO_URI = process.env.MONGO_URI
console.log(MONGO_URI)

const books = [
  {
    title: "How to Grow Your Online Store",
    description: "Learn strategies to grow your online store and stay competitive in today's market. Practical tips included Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "business",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332036/book-9_u7zftq.png",
    oldPrice: 29.99,
    newPrice: 19.99
  },
  {
    title: "Top 10 Fiction Books This Year",
    description: "Discover the top 10 fiction books you must read this year, carefully selected for their engaging stories  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "books",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332187/nfzazpygfxxfo2b2lifu.png",
    oldPrice: 24.99,
    newPrice: 14.99
  },
  {
    title: "Mastering SEO in 2024",
    description: "Boost your site's search engine ranking with advanced SEO techniques and tips for success in 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "marketing",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332186/cnob07b1ayo2lxk6qkp0.png",
    oldPrice: 45.54,
    newPrice: 29.99
  },
  {
    title: "Best eCommerce Platforms",
    description: "Explore the top eCommerce platforms of 2024 and find the best one to meet your business needs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "business",
    offer: false,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332184/j4t6be61zfunxj4su2u8.png",
    oldPrice: 0,
    newPrice: 39.99
  },
  {
    title: "Non-Fiction Reads You Must Try",
    description: "Check out our top non-fiction book recommendations that will captivate, educate, and inspire you Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.",
    category: "books",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332183/h2utilg0x25wmyexrx9w.png",
    oldPrice: 25.86,
    newPrice: 9.99
  },
  {
    title: "Ultimate Guide to Digital Marketing",
    description: "Master digital marketing with this complete guide, including essential strategies and practical advice. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "marketing",
    offer: false,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332183/ho81kuoddvnqajetpii5.png",
    oldPrice: 0,
    newPrice: 34.99
  },
  {
    title: "The First Days",
    description: "Follow two women struggling to survive in a world overrun by zombies. Will they make it through the apocalypse? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "horror",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332183/ho81kuoddvnqajetpii5.png",
    oldPrice: 59.99,
    newPrice: 49.99
  },
  {
    title: "The Hunger Games",
    description: "Can you survive in a deadly arena where every move could be your last? Follow Katniss Everdeen's journey. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "fiction",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332182/lzikq9lbcfcyhxbufneo.png",
    oldPrice: 21.99,
    newPrice: 16.99
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    description: "Join Harry Potter in his fifth year at Hogwarts, where new dangers and dark secrets await him. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "adventure",
    offer: false,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332036/book-9_u7zftq.png",
    oldPrice: 0,
    newPrice: 18.99
  },
  {
    title: "Pride and Prejudice",
    description: "Experience the classic tale of Elizabeth Bennet and Mr. Darcy's tumultuous relationship in 19th-century England. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    category: "fiction",
    offer: true,
    coverImage: "https://res.cloudinary.com/djnnp85lv/image/upload/v1733332183/ho81kuoddvnqajetpii5.png",
    oldPrice: 14.99,
    newPrice: 10.99
  }
]




const insertBooks = async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        await BookSchema.deleteMany()
        await BookSchema.insertMany(books)
        console.log('books added successfully')

    } catch (error) {
        console.log(error)

    } finally{
        mongoose.disconnect()

    }

}



insertBooks()