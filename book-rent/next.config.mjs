/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.dicebear.com',
				port: ''
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				port: ''
			}
		],
		dangerouslyAllowSVG: true
	}
};

export default nextConfig;
