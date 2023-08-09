import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from "react-router-dom";
import Footer from './Footer';
const Layout = () => {

    useEffect(() => {
        const scriptUrls = [
            'plugins/jquery/jquery.min.js',
            'plugins/jquery-ui/jquery-ui.min.js',
            'plugins/bootstrap/js/bootstrap.bundle.min.js',
            'plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
            'dist/js/adminlte.js',
        ];
        const loadScript = (url: string) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };
        const loadScripts = async () => {
            for (const url of scriptUrls) {
                try {
                    await loadScript(url);
                    console.log(`Script ${url} loaded successfully`);
                } catch (error) {
                    console.error(`Error loading script ${url}:`, error);
                }
            }
        };
        loadScripts();

        document.body.classList.add(
            'hold-transition',
            'sidebar-mini',
            'layout-fixed',
        );

        return () => {
            // Clean up any resources (e.g., remove the dynamically added scripts) when the component is unmounted
            for (const url of scriptUrls) {
                const script = document.querySelector(`script[src="${url}"]`);
                if (script) {
                    document.body.removeChild(script);
                }
            }
        };
        
    }, [])

    return (
        <>
            {/* <Helmet>
                <title>My Title</title>

            </Helmet> */}
            <div className="wrapper">

                <Navbar />
                {/* Main Sidebar Container */}
                <Sidebar />
                {/* Content Wrapper. Contains page content */}
                <Outlet />
                {/* /.content-wrapper */}
                <Footer />
                {/* Control Sidebar */}
            </div>
        </>
    )
}

export default Layout