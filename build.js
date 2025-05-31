// This is a blog feed build script to be run by Node.js
import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import showdown from 'showdown';

// Ensure output directory exists
const outputDir = path.join(import.meta.dirname, 'feed');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

[
        {
                title       : "DevOps Blog Feed",
                description : "Latest posts from the DevOps blog",
                favicon     : "https://lzone.de/favicon.ico",
                link        : "https://lzone.de/blog",
                input       : path.join(import.meta.dirname, 'Blogs', 'DevOps'),
                output      : path.join(outputDir, 'devops.xml')
        },
        {
                title       : "Liferea Development Blog",
                description : "Latest posts from the Liferea blog",
                favicon     : "https://lzone.de/liferea/favicon.ico",
                link        : "https://lzone.de/liferea/blog",
                input       : path.join(import.meta.dirname, 'Blogs', 'Liferea'),
                output      : path.join(outputDir, 'liferea.xml')
        }
].forEach((f) => {

        // Read posts from the posts directory
        const posts = fs.readdirSync(f.input)
        .filter(file => file.endsWith('.md'))
        .map(file => {
                const content = fs.readFileSync(path.join(f.input, file), 'utf-8');
                const [title, date] = content.split('\n').slice(0, 2);
                const converter = new showdown.Converter();

                const frontMatterRegex = /^---[\s\S]*?---(?:\r?\n|\r)/m;
                const cleanedContent = content.replace(frontMatterRegex, '').trim();
                const hasTitle = /^# .+/m.test(content);
                const filenameDateMatch = file.match(/^\d{4}-\d{2}-\d{2}/);
                const extractedDate = filenameDateMatch ? new Date(filenameDateMatch[0]) : new Date();
                const extractedTitle = path.basename(file, '.md').split('-').slice(3).join(' ').trim();
                return {
                        title   : hasTitle
                                  ?title.replace('# ', '').trim()
                                  :extractedTitle,
                        date    : extractedDate,
                        content : converter.makeHtml(cleanedContent),
                        link    : f.link + '/' + file.replace('.md', ''),
                        id      : f.link + '/' + encodeURIComponent(extractedTitle)
                };
        })
        .sort((a, b) => b.date - a.date) // Sort by date descending
        .slice(0, 25); // Limit to the 25 most recent items

        // Create a new feed
        const feed = new Feed({
                title       : f.title,
                description : f.description,
                favicon     : f.favicon,
                id          : f.link,
                link        : f.link
        });
        // Add posts to the feed
        posts.forEach(post => {
        feed.addItem({
                title       : post.title,
                id          : post.id,
                link        : post.link,
                description : post.content,
                date        : post.date
        });
        });
        // Write the feed to a file
        fs.writeFileSync(f.output, feed.atom1(), 'utf-8');
        console.log(`Feed generated at ${f.output}`);
});
