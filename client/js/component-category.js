Vue.component(
    'component-category',
    {
        props: ['category'],
        template : `
            <div>
                <h4 style="font-weight:bold;">{{category.name}}</h4>
                <div class="row" style="margin-top:10px"></div>
            </div>`,
    },
)  