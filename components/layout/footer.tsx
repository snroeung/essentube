import { Footer } from 'flowbite-react';
import type { NextPage } from 'next'

const Header: NextPage = () => {

    return (
        <Footer className="bg-slate-800 text-white" container={true}>
            <Footer.Copyright
                href="#"
                by="Sarenna Roeung"
                year={2023}
            />
        </Footer>
    );
}

export default Header

