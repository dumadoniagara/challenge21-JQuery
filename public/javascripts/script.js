
$(document).ready(() => {
    loadData();

    $('table tbody').on('click', '.btn-edit', function (e) {
        let id = $(this).attr('dataid');
    
        $('.btn-edit').on('click', '.btn-change', function (e) {
            let string = $('#editString').val();
            let integer = $('#editInteger').val();
            let float = $('#editFloat').val();
            let date = $('#editDate').val();
            let bool = $('#editBoolean').val();
            editData(id, string, integer, float, date, bool);
        })
    })

    $('.btn-add').on('click', '.btn-save', function (e) {
        // e.preventDefault();
        let string = $('#addString').val();
        let integer = $('#addInteger').val();
        let float = $('#addFloat').val();
        let date = $('#addDate').val();
        let bool = $('#addBoolean').val();

        console.log([string, integer, float, date, bool]);
        addData(string, integer, float, date, bool);
    })

    $('table tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('dataid');
        console.log(id);
        deleteData(id);
    })
})

const loadData = () => {
    $.ajax({
        methdod: "GET",
        url: "http://localhost:3000/api/",
        data: {}, //diisi ketika kamu butuh filter
        dataType: "json"
    }).done(result => {
        let data = result.data;
        let html = "";
        data.forEach(item => {
            html += `<tr>
                    <td>${item.id}</td>
                    <td valString="${item.stringdata}">${item.stringdata}</td>
                    <td valInteger="${item.integerdata}">${item.integerdata}</td>
                    <td valFloat="${item.floatdata}">${item.floatdata}</td>
                    <td valDate="${item.datedata}">${item.datedata}</td>
                    <td valBool="${item.booleandata}">${item.booleandata}</td>
                    <td>
                      <button type="button" class="btn btn-success btn-edit" dataid="${item.id}" data-toggle="modal" data-target="#editModal"> Edit </button>
                      <button type="button" class="btn btn-danger btn-delete" dataid="${item.id}"> Delete </button>
                    </td>                  
                </tr>`
        });
        $("table tbody").html(html);
    })
        .fail(function (err) {
            console.log("gagal-read")
        });
}

const addData = (stringdata, integerdata, floatdata, datedata, booleandata) => {
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/api/",
        data: { stringdata, integerdata, floatdata, datedata, booleandata },
        dataType: 'json'
    }).done(() => {
        loadData();
    })
        .fail((err) => {
            console.log("gagal-add")
        });
        $('#addForm').trigger('reset');
}

const deleteData = (id) => {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/api/" + id,
        dataType: 'json'
    })
        .done(() => {
            loadData();
        })
        .fail((err) => {
            console.log('error delete');
        })
}

const editData = (id, stringdata, integerdata, floatdata, datedata, booleandata) => {
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/api/" + id,
        data: { stringdata, integerdata, floatdata, datedata, booleandata },
        dataType: 'json'
    }).done(() => {
        loadData();
    })
        .fail((err) => {
            console.log("gagal-add")
        });
}






// ============================ YASA ===================
const showData = id => {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/api/` + id,
        dataType: 'json'
    })
        .done(result => {
            let items = result.data;
            let html = '';
            items.forEach(item => {
                $('#submit-data').attr('dataid', item.id);
                $('input#modalId').val(item.id);
                $('input#modalString').val(item.string);
                $('input#modalInteger').val(item.integer);
                $('input#modalFloat').val(item.float);
                $('input#modalDate').val(item.date);
                if (item.boolean == 'true') {
                    html += `<option value="true" selected>true</option>
          <option value="false">false</option>`;
                } else {
                    html += `<option value="true">true</option>
          <option value="false" selected>false</option>`;
                };
            });
            $('#modalBoolean').html(html);
        });
};
