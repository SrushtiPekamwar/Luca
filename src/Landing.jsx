import { FaGithub, FaLinkedin } from "react-icons/fa";
import './landing.css'
import { useEffect, useState } from "react";
import axios from "axios";
import ss from './assets/ss.png'
import { SiLeetcode } from "react-icons/si";

function LandingPage() {
    const [spPic, setSpPic] = useState();
    const [svPic, setSvPic] = useState();

    useEffect(() => {

        axios.get("https://api.github.com/users/SrushtiPekamwar")
            .then((res) => {
                setSpPic(res.data.avatar_url)
            })

        axios.get("https://api.github.com/users/SwarupVishwas18")
            .then((res) => {
                setSvPic(res.data.avatar_url)
            })
    }, [])

    return (
        <>
            <div className="header">
                <nav>
                    <h1>Luca</h1>
                    <div className="navlink">
                        <a href="/editor">Editor</a>
                        <a href="https://github.com/SrushtiPekamwar/Luca/" target="_blank">Github</a>
                    </div>
                </nav>
                <div className="header-content">
                    <div className="header-ls">
                        <h1 className="title"> Luca</h1>
                        <h1>Charting Simplified</h1>
                        <h2>Generate your charts directly from Markdown-inspired text.</h2>
                    </div>
                    <div className="header-rs">
                        <img src={ss} height={300} />
                    </div>
                </div>
            </div>

            <section className="team">
                <h1>Meet the Team</h1>

                <div className="team-container">
                    <div className="team-card">
                        <div className="team-img">
                            <img src={spPic} alt="" />
                        </div>
                        <div className="card-content">

                            <h3>Srushti Pekamwar</h3>
                            <div className="team-links">

                                <div><a href="https://github.com/SrushtiPekamwar/"><FaGithub /></a></div>
                                <div><a href="https://linkedin.com/in/srushti%20pekamwar"><FaLinkedin /></a></div>
                                <div><a href="https://www.leetcode.com/srushti_"><SiLeetcode /></a></div>

                            </div></div>
                    </div>
                    <div className="team-card">
                        <div className="team-img">
                            <img src={svPic} alt="" />
                        </div>
                        <div className="card-content">

                            <h3>Swarup Vishwas</h3>
                            <div className="team-links">

                                <div><a href="https://github.com/SwarupVishwas18/"><FaGithub /></a></div>
                                <div><a href="https://www.linkedin.com/in/swarup-vishwas-8895221b9/"><FaLinkedin /></a></div>
                                <div><a href="https://leetcode.com/u/SwarupVishwas18/"><SiLeetcode /></a></div>

                            </div></div>
                    </div>
                </div>

            </section>

            <footer>
                &copy; Luca 2025
            </footer>

        </>
    )
}

export default LandingPage;