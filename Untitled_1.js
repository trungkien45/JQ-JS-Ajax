// Ajax suggestion almost similar google/facebook suggestion (similar google suggestion first version) 
$().ready(function () {
    var un ="'Nhập tựa sách cần tìm kiếm";
    var text;
    $("[id$=txtSearch]").val(un);
    $("[id$=txtSearch]").css("color", "#C0C0C0");
    $("[id$=txtSearch]").blur(function () {
        if ($(this).val() == "") {
            $(this).val(un);
            $(this).css("color", "#C0C0C0");
        }
        $("#dropdown").hide("slow");
    });
    $("[id$=txtSearch]").click(function () {
        if ($(this).val() == un) $(this).val("");
        $(this).css("color", "black");
    });
    $("[id$=txtSearch]").focus(function () {
        if ($(this).val() == un) $(this).val("");
        $(this).css("color", "black");
    });
    $("[id$=txtSearch]").bind("input", function () {
        if ($("[id$=txtSearch]").val() != "") {
            $.post("AjaxCall.aspx",
                {
                    data: $("[id$=txtSearch]").val()
                }, function (data) {
                    if (data != null) {
                        //$("#dropdown").show("slow");

                        var lis = $("#dropdown li");
                        var lif = li.first();
                        lif.html(data.Link);

                        lif = lif.next();
                        lif.html(data.Link2);

                        $.each(lis, function (index, val) {
                            $(val).filter(function () {
                                return $(this).text() === "";
                            }).hide();
                        });
                        $("#dropdown").show("slow");
                    }
                }, "json");
            text = $("[id$=txtSearch]").val();
        }
        else {
            $("#dropdown").hide("slow");
        }
    });
    var li = $("#dropdown li");
    var liSelected;
    $("[id$=txtSearch]").keyup(function (e) {
        if (e.which === 40) {//down
            if ($("#dropdown").not(":visible")) {
                if (li.filter(function () {
                    return $(this).css("display") != "none"
                }).length > 0)
                    $("#dropdown").show("slow");
            }
            if (liSelected) {
                liSelected.removeClass("selected");
                next = liSelected.next(":visible");
                if (next.length > 0) {
                    liSelected = next.addClass("selected");
                } else {
                    if (text != "")
                        $("[id$=txtSearch]").val(text);
                    liSelected.removeClass("selected");
                    liSelected = null;
                }
            } else {
                liSelected = li.eq(0).addClass("selected");
            }
            if (liSelected.html() != "")
                $("[id$=txtSearch]").val(liSelected.text());
        } else if (e.which === 38) {//up
            if ($("#dropdown").not(":visible")) {
                if (li.filter(function () {
                    return $(this).css("display") != "none"
                }).length > 0)
                    $("#dropdown").show("slow");
            }
            if (liSelected) {
                liSelected.removeClass("selected");
                next = liSelected.prev(":visible");
                if (next.length > 0) {
                    liSelected = next.addClass("selected");
                } else {
                    if (text != "")
                        $("[id$=txtSearch]").val(text);
                    liSelected.removeClass("selected");
                    liSelected = null;
                }
            } else {
                liSelected = $("#dropdown li:visible:last").addClass("selected");
            }
            if (liSelected.html() != "")
                $("[id$=txtSearch]").val(liSelected.text());
        }
    });
});
