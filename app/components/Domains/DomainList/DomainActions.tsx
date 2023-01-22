import { IconButton, Stack } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import useDomain from '../../../hooks/useDomain'
import { Domain } from '../../../interfaces/DomainInterface'



interface DomainActionsProps {
    domain: Domain,
}

const DomainActions = ( { domain }: DomainActionsProps ) => {

    const { handleDomainDelete, loading } = useDomain()

    const handleDelete = async () => {
        await handleDomainDelete( domain.id )
    }

    return (
      <Stack direction={'row'} spacing={1} mx={1}>
          <IconButton size={'small'}><Edit/></IconButton>
          <IconButton size={'small'} onClick={handleDelete}><Delete/></IconButton>
      </Stack>
    )
}
export default DomainActions