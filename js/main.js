document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('activityForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('/api/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Activity recorded successfully!');
            } else {
                alert('Failed to record activity. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
