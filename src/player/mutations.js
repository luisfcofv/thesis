import gql from 'graphql-tag';

export const generateEvents = gql`
  mutation generateEvents($world: String!, $knowledge: KnowledgeInput!) {
    generateEvents(world: $world, knowledge: $knowledge) {
      name
      description
      protagonist
      time
      location {
        name
      }
      agents {
        name
      }
      goal {
        name
      }
      cause {
        name
      }
      salience {
        social
        time
        space
        intention
        causation
        total
      }
    }
  }
`;

export default generateEvents;
