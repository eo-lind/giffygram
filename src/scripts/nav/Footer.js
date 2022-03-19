export const Footer = () => {
    // HTML to be returned to GiffyGram component
 
    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>1970</option>
                </select>
                <span id="postCount">0</span>
            </div>
            <div class="footer__item">&copy; ${new Date().getFullYear()}, NSS C55</div>
        </footer>
    `
}

