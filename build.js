import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { execSync } from 'child_process';

function compileProtobuf() {
    const protoPath = path.join(import.meta.dirname, 'license_protocol.proto');
    const outDir = path.join(import.meta.dirname, 'src', 'lib', 'widevine');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outFile = path.join(outDir, 'license_protocol.js');
    const cmd = `npx pbjs --dependency ./protobuf.min.js -t static-module -w es6 -o "${outFile}" "${protoPath}"`;
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Generated JS from ${protoPath} to ${outFile}`);
}

// Read version from package.json
function getVersion() {
    const pkg = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'package.json'), 'utf8'));
    return pkg.version;
}

function zipSrc(version) {
    const outputDir = path.join(import.meta.dirname, 'dist');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const zipPath = path.join(outputDir, `Vineless-${version}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        console.log(`Created ${zipPath} (${archive.pointer()} bytes)`);
    });

    archive.on('error', err => { throw err; });

    archive.pipe(output);
    archive.directory(path.join(import.meta.dirname, 'src'), false);
    archive.finalize();
}

// Main build process
function build() {
    compileProtobuf();
    const version = getVersion();
    zipSrc(version);
}

build();