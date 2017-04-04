import gql from 'graphql-tag';

export const generateEvents = gql`
  mutation generateEvents($world: String!, $knowledge: KnowledgeInput!) {
    generateEvents(world: $world, knowledge: $knowledge) {
      name
      state {
        player {
          location
        }
      }
      latestEvents {
        name
        description
        time
        protagonist
        location {
          name
        }
        agents {
          id
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
      agents {
        id
        name
        description
        connections
      }
      locations {
        id
        name
        neighbors {
          id
          time
        }
      }
      goals {
        id
        name
      }
      player {
        name
        knowledge {
          social
          goals
          locations
        }
      }
    }
  }
`;

export default generateEvents;
