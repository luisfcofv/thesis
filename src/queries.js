import gql from 'graphql-tag';

export const fetchWorld = gql`
  query FetchWorld($name: String!) { 
    world(name: $name) {
      name
      latestEvents {
        name
        description
        location {
          name
        }
        agents {
          id
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

export default { fetchWorld };
