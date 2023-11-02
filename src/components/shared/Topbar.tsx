import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'

const Topbar = () => {

    const {mutate: signOut, isSuccess} = useSignOutAccount();

  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to="/" className="flex gap-3 items-center">
                <img src="/assets/images/logo.png" className="-mt-6" width={120} height={110} />
            </Link>


            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost' onClick={()=> signOut()}>
                    <img src="/assets/icons/logout.svg" alt="" />
                </Button>
            </div>
        </div>
    </section>
  )
}

export default Topbar