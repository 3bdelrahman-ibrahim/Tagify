exports.renderUserTemplate = (user) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - User Details</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto">
                    <div class="divide-y divide-gray-200">
                        <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div class="flex items-center space-x-4 mb-6">
                                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span class="text-2xl font-bold text-gray-600">
                                        ${user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h1 class="text-3xl font-bold text-gray-900">${user.name}</h1>
                                    <p class="text-gray-500">${user.email}</p>
                                </div>
                            </div>

                            ${user.age ? `
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm font-medium text-gray-500">Age</p>
                                <p class="mt-1 text-lg font-semibold">${user.age}</p>
                            </div>
                            ` : ''}

                            ${user.profile?.bio ? `
                            <div class="mt-6">
                                <h2 class="text-xl font-bold text-gray-900 mb-3">About</h2>
                                <p class="text-gray-700">${user.profile.bio}</p>
                            </div>
                            ` : ''}

                            ${user.profile?.socialLinks?.length ? `
                            <div class="mt-6">
                                <h2 class="text-xl font-bold text-gray-900 mb-3">Social Links</h2>
                                <ul class="space-y-2">
                                    ${user.profile.socialLinks.map(link => `
                                        <li>
                                            <a href="${link}" 
                                               target="_blank"
                                               class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                                ${new URL(link).hostname}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

exports.renderErrorTemplate = (message) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div class="max-w-md mx-auto text-center">
                    <h1 class="text-3xl font-bold text-red-600 mb-4">Error</h1>
                    <p class="text-gray-700">${message}</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;