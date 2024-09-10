import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="team-section">
                    <h3>Yelper Team</h3>
                    <div className="team-members">
                        <div className="team-member">
                            <h4>Hazel Caling</h4>
                            <a href="https://github.com/hazelcaling" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://linkedin.com/in/hazel-c-37255a59" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                        <div className="team-member">
                            <h4>Yasuhiro Sekiyama</h4>
                            <a href="https://google.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://google.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <p className="copyright">&copy; 2024 Yelper. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
