import { client } from './Apollo-Client';
import { gql } from "@apollo/client";

export const getAllNotes = async () => await client.query({
    query: gql`
    query MyQuery {
        neon_notes {
            id
            note
            type
            completed
          }
      }
  `,
});

export const getTodoNotes = async () => await client.query({
    query: gql`
    query getTodoNotes {
        neon_notes(where: {type: {_eq: "todo"},completed:{_eq:false}}) {
            id
            note
            completed
            type
        }
    }
    `
})  

export const getLinks = async () => await client.query({
    query: gql`
    query getLinks {
        neon_notes(where: {type: {_eq: "link"},completed:{_eq:false}}) {
            id
            note
            completed
            type
            link
        }
    }
    `
})  