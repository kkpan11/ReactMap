import { gql } from '@apollo/client'

const getAvailable = gql`
  query Available {
    available {
      masterfile
      pokestops
      gyms
      pokemon
      nests
      filters
      questConditions
      icons
      audio
    }
  }
`

export default getAvailable
