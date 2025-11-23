// This is a blog feed build script to be run by Node.js
import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import showdown from 'showdown';

function createFeeds() {
        const converter = new showdown.Converter({
        tables: true,
        metadata: true,
        ghCodeBlocks: true
        });
        converter.setFlavor('github');
        converter.setOption('simpleLineBreaks', false);

        // Ensure output directory exists
        const outputDir = path.join(import.meta.dirname, 'www','feed');
        if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        }

        [
                {
                        title       : "DevOps Blog Feed",
                        description : "Latest posts from the DevOps blog",
                        favicon     : "https://lzone.de/favicon.ico",
                        link        : "https://lzone.de/blog/",
                        input       : path.join(import.meta.dirname, 'Blogs', 'DevOps'),
                        output      : path.join(outputDir, 'devops.xml')
                },
                {
                        title       : "Liferea Development Blog",
                        description : "Latest posts from the Liferea blog",
                        favicon     : "https://lzone.de/liferea/favicon.svg",
                        link        : "https://lzone.de/liferea/blog/",
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
                                link    : f.link + '#' + file.replace('.md', ''),
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
}

function createPhlogs() {
        const gopherServer = 'gopher.lzone.de\t70';

        // Ensure output directory exists
        const outputDir = path.join(import.meta.dirname, 'gopher', 'phlogs');
        if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
        }

        [
                {
                        title       : 'DevOps',
                        input       : path.join(import.meta.dirname, 'Blogs', 'DevOps'),
                        output      : path.join(outputDir, 'devops')
                },
                {
                        title       : 'Liferea',
                        input       : path.join(import.meta.dirname, 'Blogs', 'Liferea'),
                        output      : path.join(outputDir, 'liferea')
                }
        ].forEach((f) => {
                // Read posts from the posts directory
                let gophermap = [
                        `iThis is the ${f.title} phlog\t\tfake\t1`,
                        `i \t\tfake\t1`
                ];
                const posts = fs.readdirSync(f.input)
                .filter(file => file.endsWith('.md'))
                .sort((a, b) => {
                        const dateA = new Date(a.match(/^\d{4}-\d{2}-\d{2}/) ? a.match(/^\d{4}-\d{2}-\d{2}/)[0] : 0);
                        const dateB = new Date(b.match(/^\d{4}-\d{2}-\d{2}/) ? b.match(/^\d{4}-\d{2}-\d{2}/)[0] : 0);
                        return dateB - dateA;
                })
                .forEach(file => {
                        const content = fs.readFileSync(path.join(f.input, file), 'utf-8');
                        const frontMatterRegex = /^---[\s\S]*?---(?:\r?\n|\r)/m;
                        const cleanedContent = content.replace(frontMatterRegex, '').trim();
                        const phlogPath = path.join(f.output, file.replace('.md', '.txt').replace(/ /g, '_'));
                        const phlogDir = path.dirname(phlogPath);
                        if (!fs.existsSync(phlogDir)) {
                                fs.mkdirSync(phlogDir, { recursive: true });
                        }
                        fs.writeFileSync(phlogPath, cleanedContent, 'utf-8');
                        gophermap.push(`0${file.replace('.md', '')}\t/${path.relative(path.join(import.meta.dirname, "gopher"), phlogPath)}\t${gopherServer}`);
                });
                // Write the gophermap file
                const gophermapPath = path.join(f.output, 'gophermap');
                fs.writeFileSync(gophermapPath, gophermap.join('\n'), 'utf-8');
                console.log(`Phlog generated at ${f.output}`);
        });
}

// Run the build processes
createFeeds();
createPhlogs();