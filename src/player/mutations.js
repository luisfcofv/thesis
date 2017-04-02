import gql from 'graphql-tag';

export const generateEvents = gql`
  mutation generateEvents($world: String!, $knowledge: KnowledgeInput!) {
    generateEvents(world: $world, knowledge: $knowledge) {
      name
      description
      location {
        name
      }
      agents {
        name
      }
      salience {
        social
        time
        space
        intention
        causation
      }
    }
  }
`;

export default generateEvents;
