// eslint-disable-next-line no-unused-vars
export const RazerpayPayment = (amount, onSuccess) => {
    const options = {
        key: 'rzp_test_whnmLET9rja8Yc', // Use the Test API key here
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Pizza App',
        description: 'Custom Pizza Order',
        handler: function(response) {
            onSuccess(response);
        },
        prefill: {
            name: 'Sudarshan Hingalje',
            email: 'sudarshanhingalje1@gmail.com',
        },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
};    