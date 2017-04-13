import gql from 'graphql-tag';

export const generateEvents = gql`
  mutation GenerateEvents($world: String!, $knowledge: KnowledgeInput!, $location: Int!) {
    generateEvents(world: $world, knowledge: $knowledge, location: $location) {
      name
      state {
        player {
          location
        }
      }
      latestEvents {
        name
        description
        propagation
        protagonist
        location {
          name
          description
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
