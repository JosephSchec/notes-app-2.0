import { client } from './Apollo-Client';
import { gql } from '@apollo/client';

interface props {
	note: string;
	type: string;
	link?: string;
}

export const insertNotes = async ({ note, type }: props) =>
	await client.mutate({
		mutation: gql` 
            mutation insertNotes {
            insert_neon_notes(objects: {completed: false, note:""" ${note}""", type: ${type}}) {
                affected_rows
                returning {
                     id
                 }
            }
        }
`,
	});

export const updateNote = async (id: number) =>
	await client.mutate({
		mutation: gql`
      mutation update_neon_notes{ update_notes(_set: {completed: true}, where: {id: {_eq: ${id}}}) {
    affected_rows}
  }`,
	});

export const deleteNote = async (id: number) =>
	await client.mutate({
		mutation: gql`
        mutation deleteNote {
            delete_neon_notes(where: {id: {_eq: ${id}}}) {
                affected_rows
            }
            }`,
	});
export const deleteNoteByVal = async (note: string) =>
	await client.mutate({
		mutation: gql`
        mutation deleteNote {
            delete_neon_notes(where: {note: {_eq:"""${note}"""}}) {
                affected_rows
            }
            }`,
	});

export const insertLink = async ({ note, type, link }: props) =>
	await client.mutate({
		mutation: gql` 
            mutation insertNotes {
            insert_neon_notes(objects: {completed: false, note:""" ${note}""", type: ${type},link:"""${link}"""}) {
                affected_rows
                returning {
                     id
                 }
            }
        }
`,
	});
