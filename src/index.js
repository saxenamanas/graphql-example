import { GraphQLServer } from 'graphql-yoga';

const users = [
    {
        id: '1',
        name: 'Manas Saxena',
        email: 'saxenamanas0@gmail.com',
        age: 23
    },
    {
        id: '2',
        name: 'Jogn',
        email: 'swvwvw',
        age: 23
    },
    {
        id: '3',
        name: 'Yui',
        email: 'ava',
        age: 23
    }
]

const posts = [
    {
        id: '1',
        title: 'title',
        body: 'aangag',
        published: false,
        author: '1'
    }
]

const comments = [
    {
        id: '1',
        comment: '1st',
        author:'1',
        post:'1'
    },
    {
        id: '2',
        comment: '2nd',
        author:'1',
        post:'1'
    },
    {
        id: '3',
        comment: '3rd',
        author:'2',
        post:'1'
    },
    {
        id: '4',
        comment: '4th',
        author:'3',
        post:'1'
    }
]

const typeDefs = `
    type Query{
        users(query:String):[User!]!
        me:Post!
        post:Post!
        posts(query:String):[Post!]!
        comments:[Comment!]!
    }
    type Post{
        id:ID!
        title:String!
        body:String!
        published:Boolean!
        author:User!
        comments:[Comment!]!
    }
    type User{
        id:ID!
        name:String!
        email:String!
        age:Int
        posts:[Post!]!
    }
    type Comment{
        id:ID!
        comment:String!
        author:User!
        post:Post!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query)
                return users;
            return users.filter((ele) => {
                return (ele.name.toLowerCase().includes(args.query.toLowerCase()))
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query)
                return posts;
            return posts.filter((ele) => {
                return (ele.title.toLowerCase().includes(args.query.toLowerCase()) || ele.body.toLowerCase().includes(args.query.toLowerCase()))
            })
        },
        me() {
            return {
                id: '1231',
                title: 'My Post',
                body: 'This is it',
                published: false
            }
        },
        post() {
            return {
                id: '122414',
                title: 'Title',
                body: 'Body',
                published: false
            }
        },
        comments() {
            return comments;
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((ele) => {
                return ele.id == parent.author
            })
        },
        comments(parent,args,ctx,info){
            return comments.filter(comment=>{
                return comment.post == parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post => {
                return post.id == parent.id
            })
        }
    },
    Comment:{
        author(parent,args,ctx,info){
            return users.find(user=>{
                return parent.author == user.id
            })
        },
        post(parent,args,ctx,info){
            return posts.find(post=>{
                return post.id==parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is up')
})